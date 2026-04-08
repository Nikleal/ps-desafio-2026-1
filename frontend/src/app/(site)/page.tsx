import Carousel from "./_components/Carousel";
import Products from "./_components/Products";
import Category from "./_components/Category";

export default async function Home() {
  return <>
    <main>
      <Carousel />
      <Category />
      <Products />
    </main>
  </>
}
