import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    title: 'My first Car',
    price: 2500,
    description: 'This is a first vehicle - Mercedes-Benz!',
    id: 'p1',
  },
  {
    title: 'My second Car',
    price: 5900,
    description: 'This is a second vehicle - BMW!',
    id: 'p2',
  },
  {
    title: 'My third Car',
    price: 1499,
    description: 'This is a third vehicle - Audi!',
    id: 'p3',
  },
  {
    title: 'My fouth Car',
    price: 850,
    description: 'This is a fouth vehicle - Porsche!',
    id: 'p4',
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item) => {
          return (
            <ProductItem
              key={item.id}
              title={item.title}
              price={item.price}
              id={item.id}
              description={item.description}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default Products;
