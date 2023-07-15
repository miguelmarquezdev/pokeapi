import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/header";
export default function Producto({ resultado }) {
  console.log(resultado);
  return (
    <div>
      <Header />
      <div className={`${resultado.types[0].type.name} h-[30vh] `}></div>
      <div className="max-w-5xl mx-auto flex bg-white -mt-[100px] rounded-2xl p-10">
        <div className="w-1/2">
          <motion.img
            src={resultado.sprites.other.dream_world.front_default}
            width={450}
            height={450}
            layoutId={resultado.sprites.other.dream_world.front_default}
          />
        </div>
        <div className=" w-1/2">
          <h1 className="font-black text-5xl uppercase text-center">
            {resultado.name}
          </h1>
          <div className="flex gap-5">
            {resultado.types.map((tipo) => (
              <span
                className={`${tipo.type.name} px-6 rounded-full uppercase text-[14px] font-semibold`}
              >
                {tipo.type.name}
              </span>
            ))}
          </div>
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
