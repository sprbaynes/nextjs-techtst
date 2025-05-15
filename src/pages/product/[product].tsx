import Image from "next/image";


export type ProductProps = {
    id: number,
    brand: string,
    category: string,
    description: string,
    images: string[],
    price: number,
    stock: number,
    thumbnail:string,
    title: string
}

export async function getStaticPaths() {
  const paths:any = [];
  const getStaticPathsObj = {
      paths:paths,
      fallback:false
  }
  
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL || '')
  const products = await res.json()
  
  products.forEach((product)=>{

      getStaticPathsObj.paths.push(
          {
              params:{product: ''+product.id}
          }
      )       
  })

  return getStaticPathsObj;
}

export async function getStaticProps<ProductProps>(context) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}${context.params.product}`)
  const product = await res.json()

  return {
    props: { ...product }
  }
}

export default function Products({id, brand, category, description, images, price, stock, thumbnail, title}:ProductProps) {
  return (
    <div>
      {id}
      {brand} 
      {category} 
      {description}
      {images}
      {price}
      {stock}
      {thumbnail}
      {title}
    </div>
  );
}
