import { component$ } from '@builder.io/qwik';
import { RequestHandler, useEndpoint, loader$ } from '@builder.io/qwik-city';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface Category {
  id: string;
  name: string;
  products: Array<Product>;
}

export const onGet: RequestHandler<Category[]> = async () => {
  const categories: Category[] = [
    {
      id: '1',
      name: 'Food',
      products: [
        {
          id: '12',
          name: 'Baby carrots',
          description: 'Great for baby rabbits.',
          price: 4.99,
        },
        {
          id: '21',
          name: 'Romaine Lettuce',
          description: 'Fresh from the farm.',
          price: 3.29,
        },
      ],
    },
    {
      id: '2',
      name: 'Movies',
      products: [
        {
          id: '13',
          name: 'Rabbits are Forever',
          description:
            'James Bond, a rabbit, equipped with an armoury of hi-tech gadgets, infiltrates a Las Vegas carrot-smuggling ring in a bid to foil a plot to target Washington with a laser in space. However, as 007 prepares to tackle the evil Blofeld, the mastermind who threatens to destabilise the world, he is captivated by the delicious Tiffany Case - but is she really a double agent?',
          price: 14.99,
        },
        {
          id: '24',
          name: 'Who Framed Roger Rabbit?',
          description:
            "Down-on-his-luck private eye Eddie Valiant (Bob Hoskins) gets hired by cartoon producer R.K. Maroon (Alan Tilvern) to investigate an adultery scandal involving Jessica Rabbit (Kathleen Turner), the sultry wife of Maroon's biggest star, Roger Rabbit (Charles Fleischer). But when Marvin Acme (Stubby Kaye), Jessica's alleged paramour and the owner of Toontown, is found murdered, the villainous Judge Doom (Christopher Lloyd) vows to catch and destroy Roger.",
          price: 14.99,
        },
      ],
    },
    {
      id: '3',
      name: 'Clothing',
      products: [
        {
          id: '1',
          name: 'Track Suit',
          description: "It'll never slow you down.",
          price: 37.99,
        },
        {
          id: '2',
          name: 'AirSole Runners',
          description: 'Put a spring in your hop.',
          price: 104.32,
        },
      ],
    },
  ];

  return categories;
};

export default component$(async () => {
  const categoryData = useEndpoint<Category[]>();
  console.log(await categoryData.value);

  return (
    <div class='prose'>
      <h1>The Qwik Rabbit Store</h1>
      <h2>Categories</h2>
      <ul>
        {(await categoryData.value).map((cat) => (
          <li key={cat.id}>
            <details>
              <summary>{cat.name}</summary>
              <ul>
                {cat.products.map((p) => (
                  <li key={p.id}>
                    <details>
                      <summary>{p.name}</summary>
                      <p>{p.description}</p>
                      <p>${p.price}</p>
                    </details>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
});
