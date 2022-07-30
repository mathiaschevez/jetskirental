import Stripe from 'stripe'
import { urlFor } from '../../lib/client'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if(req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        allow_promotion_codes: true,
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        line_items: req.body.map((item) => {
          const newImage = urlFor(item.image[0]).toString()
          const description = item?.qty + ' jetski(s) | ' + ' Days: ' + item?.days?.toString()

          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [newImage],
                description: description,
              },
              unit_amount: item.price * 100,
            },
            quantity: item.days.length,
          }
        }),  

        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cart`,
      }

      const session = await stripe.checkout.sessions.create(params)
      res.status(200).json(session)
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message)
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}