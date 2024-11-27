import mongoose, { Schema, Document } from 'mongoose'

export interface product extends Document {
     id: string;
     productName: string;
     price: string;
     image: string;
     productDescription: string;
     department: string;
}

const productSchema = new Schema<product>({
     id: {
          type: String,
          required: true,
     },
     productName: {
          type: String,
          required: true,
     },
     price: {
          type: String,
          required: true,
     },
     image: {
          type: String,
          required: true,
     },
     productDescription: {
          type: String,
          required: true,
     },
     department: {
          type: String,
          required: true,
     }
}, {
     timestamps: true,
})

const Product = (mongoose.models.product as mongoose.Model<product>) || mongoose.model<product>('product', productSchema);
export default Product;