import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { Pool } from 'pg';
import nodemailer from 'nodemailer';

dotenv.config();

const PORT = 3000;
const DATABASE_URL = process.env.DATABASE_URL;
const EMAIL_USER = process.env.EMAIL_USER || 'arcurepharma3007@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'sgnq wmxu doqi pomk';
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'faizanfaisal12345@gmail.com';
const OWNER_WHATSAPP = process.env.OWNER_WHATSAPP || '923162647620';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin@arcure';

// Lazy PostgreSQL client initialization
let dbPool: Pool | null = null;
function getDb(): Pool | null {
  if (!dbPool && DATABASE_URL) {
    try {
      dbPool = new Pool({
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 5000,
      });
      // Initialize table if not exists
      dbPool.query(`
        CREATE TABLE IF NOT EXISTS arcure_orders (
          id SERIAL PRIMARY KEY,
          order_id VARCHAR(50) NOT NULL UNIQUE,
          tracking_number VARCHAR(50) NOT NULL UNIQUE,
          customer_name VARCHAR(255) NOT NULL,
          customer_phone VARCHAR(50) NOT NULL,
          customer_city VARCHAR(100),
          customer_address TEXT,
          items_count INTEGER DEFAULT 1,
          products_detail TEXT,
          total_amount NUMERIC(10, 2) NOT NULL,
          order_status VARCHAR(50) DEFAULT 'Order Placed',
          notes TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        ALTER TABLE arcure_orders ADD COLUMN IF NOT EXISTS products_detail TEXT;
      `).catch(err => {
        console.warn('Neon DB init note:', err.message);
      });
    } catch (e) {
      console.warn('Database pool initialization error:', e);
    }
  }
  return dbPool;
}

// Mailer transporter setup
function getTransporter() {
  if (!EMAIL_USER || !EMAIL_PASS) return null;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize DB in background
  getDb();

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ 
      status: 'ok', 
      db: !!DATABASE_URL,
      email: !!EMAIL_USER,
      time: new Date().toISOString()
    });
  });

  // Public Configuration
  app.get('/api/config', (req, res) => {
    res.json({
      ownerWhatsApp: OWNER_WHATSAPP,
      ownerWhatsAppFormatted: '0316 2647620',
      ownerEmail: OWNER_EMAIL,
      companyEmail: EMAIL_USER,
    });
  });

  // Track Order endpoint (queries live database or returns structured response)
  app.get('/api/orders/track/:trackingNumber', async (req, res) => {
    const { trackingNumber } = req.params;
    const query = (trackingNumber || '').trim();

    const pool = getDb();
    if (pool) {
      try {
        const result = await pool.query(
          'SELECT * FROM arcure_orders WHERE LOWER(tracking_number) = LOWER($1) OR LOWER(order_id) = LOWER($1) LIMIT 1',
          [query]
        );
        if (result.rows.length > 0) {
          const row = result.rows[0];
          let parsedProducts = [];
          try {
            if (row.products_detail) {
              parsedProducts = JSON.parse(row.products_detail);
            }
          } catch (e) {
            console.warn('Failed parsing products_detail:', e);
          }

          return res.json({
            found: true,
            order: {
              orderId: row.order_id,
              trackingNumber: row.tracking_number,
              customerName: row.customer_name,
              items: row.items_count,
              products: parsedProducts,
              totalAmount: Number(row.total_amount),
              currentStatus: row.order_status,
              estimatedDelivery: '3 - 4 Working Days',
              createdAt: row.created_at,
            },
          });
        }
      } catch (err) {
        console.error('Error fetching order from Neon DB:', err);
      }
    }

    return res.status(404).json({
      found: false,
      message: 'Order not found in database',
    });
  });

  // Place Order endpoint (stores into Neon DB & sends email notification)
  app.post('/api/orders', async (req, res) => {
    const { name, phone, city, address, notes, items, totalAmount } = req.body;
    
    const trackingNumber = (req.body.trackingNumber && String(req.body.trackingNumber).trim()) || `TRK-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderId = (req.body.orderId && String(req.body.orderId).trim()) || `ORD-${Date.now().toString().slice(-5)}`;

    // Parse and normalize products list
    const rawItems = Array.isArray(items) ? items : [];
    const formattedProducts = rawItems.map((it: any) => {
      const title = it.title || it.product?.title || it.name || it.product?.name || 'Arcure Dermatological Product';
      const quantity = Math.max(1, Number(it.quantity || it.qty || 1));
      const price = Number(it.price || it.product?.price || 0);
      const subtotal = quantity * price;
      return {
        title,
        quantity,
        price,
        subtotal,
      };
    });

    const totalItemsCount = formattedProducts.reduce((sum, p) => sum + p.quantity, 0) || rawItems.length || 1;

    const pool = getDb();
    if (pool) {
      try {
        await pool.query(
          `INSERT INTO arcure_orders 
           (order_id, tracking_number, customer_name, customer_phone, customer_city, customer_address, items_count, products_detail, total_amount, notes)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
           ON CONFLICT (tracking_number) DO UPDATE SET
             products_detail = EXCLUDED.products_detail,
             total_amount = EXCLUDED.total_amount`,
          [
            orderId,
            trackingNumber,
            name || 'Customer',
            phone || 'N/A',
            city || 'N/A',
            address || 'N/A',
            totalItemsCount,
            JSON.stringify(formattedProducts),
            totalAmount || 0,
            notes || '',
          ]
        );
      } catch (err) {
        console.error('Neon DB insert error (non-fatal):', err);
      }
    }

    // Build products list HTML for the Order Details section in the email
    const productsHtmlRows = formattedProducts.length > 0
      ? formattedProducts.map((p, idx) => `
        <div style="padding: 8px 10px; margin-bottom: 6px; background: #faf5f8; border: 1px solid #f3d8e2; border-radius: 6px;">
          <div style="font-weight: 700; color: #44122a; font-size: 13px; line-height: 1.3;">${idx + 1}. ${p.title}</div>
          <div style="font-size: 12px; color: #555; margin-top: 3px;">
            Quantity: <strong style="color: #222;">${p.quantity}</strong> &nbsp;•&nbsp; 
            Price: <strong>Rs. ${Number(p.price).toLocaleString()}</strong>
            ${p.quantity > 1 ? ` &nbsp;•&nbsp; Subtotal: <strong style="color: #a83866;">Rs. ${Number(p.subtotal).toLocaleString()}</strong>` : ''}
          </div>
        </div>
      `).join('')
      : `<div style="font-style: italic; color: #888;">Arcure Formulation (${totalItemsCount} item)</div>`;

    // Send Email to Owner & Customer via Gmail SMTP
    try {
      const transporter = getTransporter();
      if (transporter) {
        const orderSummaryHtml = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #fae3ec; border-radius: 12px; background: #ffffff;">
            <div style="background: #44122a; padding: 16px; border-radius: 8px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0; font-size: 20px; letter-spacing: 1px; font-weight: 800;">ARCURE PHARMA</h2>
              <p style="margin: 5px 0 0; font-size: 13px; color: #fae3ec;">New Order Received #${orderId}</p>
            </div>
            
            <div style="padding: 20px 10px;">
              <h3 style="color: #44122a; margin-top: 0; font-size: 18px; border-bottom: 2px solid #fae3ec; padding-bottom: 6px;">Order Details</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <tr>
                  <td style="padding: 7px 0; color: #666; width: 34%; vertical-align: top;"><strong>Tracking Number:</strong></td>
                  <td style="padding: 7px 0; color: #a83866; font-weight: bold; font-family: monospace; font-size: 14px;">${trackingNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 7px 0; color: #666; vertical-align: top;"><strong>Customer Name:</strong></td>
                  <td style="padding: 7px 0; color: #111; font-weight: 600;">${name || 'Customer'}</td>
                </tr>
                <tr>
                  <td style="padding: 7px 0; color: #666; vertical-align: top;"><strong>Phone / WhatsApp:</strong></td>
                  <td style="padding: 7px 0; color: #111; font-weight: 600;">
                    <a href="tel:${phone}" style="color: #059669; text-decoration: none;">${phone || 'N/A'}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 7px 0; color: #666; vertical-align: top;"><strong>Delivery City:</strong></td>
                  <td style="padding: 7px 0; color: #111;">${city || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 7px 0; color: #666; vertical-align: top;"><strong>Address:</strong></td>
                  <td style="padding: 7px 0; color: #111;">${address || 'N/A'}</td>
                </tr>

                <!-- Products in Order Details -->
                <tr>
                  <td style="padding: 10px 0 6px 0; color: #666; vertical-align: top; border-top: 1px solid #f2e9ed;">
                    <strong>Products:</strong>
                  </td>
                  <td style="padding: 10px 0 6px 0; border-top: 1px solid #f2e9ed;">
                    ${productsHtmlRows}
                  </td>
                </tr>

                ${notes ? `
                <tr>
                  <td style="padding: 7px 0; color: #666; vertical-align: top;"><strong>Customer Notes:</strong></td>
                  <td style="padding: 7px 0; color: #555; font-style: italic;">${notes}</td>
                </tr>
                ` : ''}

                <tr>
                  <td style="padding: 10px 0; color: #666; vertical-align: top; border-top: 1px solid #f2e9ed;"><strong>Total Amount:</strong></td>
                  <td style="padding: 10px 0; font-weight: bold; color: #44122a; font-size: 15px; border-top: 1px solid #f2e9ed;">
                    Rs. ${Number(totalAmount).toLocaleString()} <span style="font-size: 12px; font-weight: normal; color: #666;">(Cash on Delivery)</span>
                  </td>
                </tr>
              </table>
              
              <div style="margin-top: 20px; padding: 12px 14px; background: #fdf4f7; border-left: 4px solid #a83866; border-radius: 4px;">
                <p style="margin: 0; font-size: 12px; color: #44122a; line-height: 1.5;">
                  <strong>Action Required:</strong> Call the customer on <strong>${phone}</strong> or message on WhatsApp to confirm delivery dispatch.
                </p>
                <div style="margin-top: 8px;">
                  <a href="https://wa.me/${(phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${name || ''}! This is Arcure Pharma confirming your order #${orderId} (${trackingNumber}).`)}"
                     style="display: inline-block; padding: 5px 12px; background: #059669; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 11px; font-weight: bold;">
                    WhatsApp Customer
                  </a>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 12px; margin-top: 8px;">
              Arcure Pharma • Plot No. E99/B, Site Super Highway, Karachi • +92 316 2647620
            </div>
          </div>
        `;

        const firstProductTitle = formattedProducts[0]?.title;
        const extraLabel = formattedProducts.length > 1 ? ` +${formattedProducts.length - 1} more` : '';
        const itemTag = firstProductTitle ? ` [${firstProductTitle}${extraLabel}]` : '';

        await transporter.sendMail({
          from: `"Arcure Pharma Store" <${EMAIL_USER}>`,
          to: `${OWNER_EMAIL}, ${EMAIL_USER}`,
          subject: `📦 New Order Alert [${trackingNumber}]${itemTag} - ${name || 'Customer'} (Rs. ${Number(totalAmount).toLocaleString()})`,
          html: orderSummaryHtml,
        });
      }
    } catch (mailErr) {
      console.warn('Mail dispatch warning:', mailErr);
    }

    res.json({
      success: true,
      orderId,
      trackingNumber,
      products: formattedProducts,
      message: 'Order saved successfully and dispatch notified',
    });
  });

  // Admin Login endpoint
  app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      return res.json({ success: true, token: 'arcure_session_authenticated' });
    }
    return res.status(401).json({ success: false, message: 'Invalid admin password' });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Arcure Pharma server running on port ${PORT}`);
  });
}

startServer();
