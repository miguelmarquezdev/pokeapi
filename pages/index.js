import Header from "@/components/header";
import Pokemon from "@/components/pokemon";

export default function Home({ pokemonListo }) {
  return (
    <main>
      <Header />
      <section>
        <div className="max-w-5xl mx-auto px-3 md:px-0 py-20">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {pokemonListo.map((pokemon) => (
              <Pokemon key={pokemon.id} pokemon={pokemon} />
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  const result = await res.json();
  const pokemons = result.results;
  const pokes = [];

  for (let i = 0; i < pokemons.length; i++) {
    try {
      let risponse = await fetch(pokemons[i].url),
        data = await risponse.json();
      pokes.push(data);
    } catch (error) {}
  }

  let pokemonListo = pokes.map((pok) => {
    return {
      id: pok.id,
      name: pok.name,
      image: pok.sprites.other.dream_world.front_default,
      types: pok.types,
    };
  });

  return {
    props: {
      pokemonListo,
    },
  };
}
