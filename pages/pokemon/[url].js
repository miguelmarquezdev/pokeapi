import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/header";
import { style } from "motion";
export default function Producto({ resultado }) {
  console.log(resultado);
  return (
    <div>
      <Header bgslate={`${resultado.types[0].type.name} absolute w-full`} />
      <div className={`${resultado.types[0].type.name} h-[40vh] md:h-[50vh] `}></div>
      <div className="shadow-md max-w-5xl mx-auto flex flex-col md:flex-row bg-white md:-mt-[30vh] rounded-2xl p-5">
        <div className="w-full md:w-1/2 px-10">
          <motion.img
            src={resultado.sprites.other.dream_world.front_default}
            width={450}
            height={450}
            layoutId={resultado.sprites.other.dream_world.front_default}
            className="drop-shadow-lg md:mt-0 -mt-[30vh]"
          />
        </div>
        <div className="w-full md:w-1/2 md:border-l-2 border-zinc-300/50  md:pl-10">
          <h1 className="font-black text-5xl uppercase text-center mb-10 mt-5 md:m-0">
            {resultado.name}
          </h1>
          <div className="flex gap-5 justify-center mt-5">
            {resultado.types.map((tipo) => (
              <span
                className={`${tipo.type.name} px-6 rounded-full uppercase text-[14px] font-semibold`}
              >
                {tipo.type.name}
              </span>
            ))}
          </div>
          <h2 className="font-black text-2xl text-center mt-5 uppercase">Stats</h2>
          <ul>
            {resultado.stats.map((stat) => (
              <li
                className={`px-6 rounded-full uppercase text-[14px] font-semibold mx-0 p-0`}
              >
                <div class="flex justify-between mb-1">
                  <span className="text-base font-medium text-black dark:text-white"><b>{stat.stat.name}</b></span>
                  <span className="text-sm font-medium text-black dark:text-white">{stat.base_stat}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div className="bg-rose-600 h-2.5 rounded-full" style={{ width: stat.base_stat }}></div>
                </div>
              </li>
            ))}
          </ul>
          <h2 className="font-black text-2xl text-center my-5 uppercase">Abilities</h2>
          <ul className="flex gap-1 justify-center">
            {resultado.abilities.map((hability) => (
              <li
                className={`px-6 rounded-full uppercase text-[14px] font-semibold m-0 p-[2px] bg-orange-950  text-white`}
              ><b>{hability.ability.name}</b>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/`);
  const resultado = await respuesta.json();
  const risponse = resultado.results;

  const paths = risponse.map((pokemon) => ({
    params: {
      url: pokemon.name,
    },
  }));

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { url } }) {
  const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${url}`);
  const resultado = await respuesta.json();

  return {
    props: {
      resultado,
    },
  };
}
