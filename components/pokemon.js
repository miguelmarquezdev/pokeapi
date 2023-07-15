import Link from "next/link";
import { motion } from "framer-motion";

export default function Pokemon({pokemon}) {
  return (
    <li className="list-none" size={50}>
      <Link href={`/pokemon/${pokemon.name}`}>
        <div className="bg-slate-200 px-3 flex flex-col md:flex-row rounded-xl justify-between items-center">
          <div className="flex flex-col gap-y-3 order-2 md:order-1">
            <h3 className="font-bold capitalize text-center  md:text-left">
              {pokemon.name}
            </h3>
            <div className="flex flex-row md:flex-col md:justify-start items-start gap-y-1 pb-4 gap-x-2 justify-center">
              {pokemon.types.map((tipo) => (
                <span
                  className={`${tipo.type.name} p-[2px] px-3 rounded-full flex items-center justify-center uppercase text-[12px] font-bold`}
                >
                  {tipo.type.name}
                </span>
              ))}
            </div>
          </div>
          <motion.img
            src={pokemon.image}
            alt={pokemon.name}
            height={100}
            width={100}
            className="h-32 drop-shadow-md hover:scale-110 transition-all duration-300 order-1 md:order-2"
            layoutId={pokemon.image}
          />
        </div>
      </Link>
    </li>
  );
}
