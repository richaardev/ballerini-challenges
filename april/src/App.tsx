import { Fragment, useEffect, useState } from "react";
import { SearchIcon } from "./assets/SearchIcon";
import communities from "./data/communities";
import { Transition } from "@headlessui/react";
import { GithubIcon } from "./assets/GithubIcon";

function App() {
  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");
  const parseMembers = (members: number) =>
    Intl.NumberFormat("en", {
      notation: "compact",
    }).format(members);

  const communities_filtered = communities.filter((community) =>
    community.name.toLowerCase().includes(search.toLowerCase()),
  );

  const joinCommunity = (link: string) => {
    window.open(link, "_blank");
  };
  return (
    <div className="bg-zinc-900 py-8 min-h-screen flex items-center justify-center">
      <a
        href="https://github.com/richaardev/ballerini-challenges"
        className="absolute top-5 right-5"
      >
        <GithubIcon />
      </a>
      <div className="flex flex-col w-full max-w-[560px] items-center gap-10">
        <img className="w-16 h-16" src="/writting.png" />
        <div className="text-center">
          <h1 className="text-3xl text-zinc-100 font-semibold">Faça algo mágico...</h1>
          <h2 className="text-2xl text-zinc-400">Ache sempre tudo em um só lugar!</h2>
        </div>
        <div className="bg-zinc-800 flex flex-col px-6 min-h-14 rounded-lg w-full">
          <label htmlFor="input" className="peer group/input flex gap-3 items-center">
            <SearchIcon />
            <input
              id="input"
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Faça algo mágico"
              className="peer outline-none font-medium bg-transparent w-full rounded-lg h-14"
            />
          </label>
          <Transition
            show={isFocused || search.length > 0}
            className="overflow-hidden"
            enter="transition transition-[max-height] duration-500"
            enterFrom="transform max-h-0"
            enterTo="transform max-h-96 overflow-y-auto"
            leave="transition transition-[max-height]  duration-500"
            leaveFrom="transform max-h-96"
            leaveTo="transform max-h-0"
          >
            <hr className="border-zinc-700" />
            <div className="flex flex-col gap-4 my-4 px-1 overflow-hidden">
              {communities_filtered.length > 0 ? (
                communities_filtered.map((community) => (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {community.image ? (
                        <img className="rounded-lg w-10 h-10" src={community.image} />
                      ) : (
                        <div className="rounded-lg w-10 h-10 bg-zinc-700" />
                      )}
                      <div className="flex flex-col">
                        <h3 className="font-medium text-zinc-200 text-lg leading-5">
                          {community.name}
                        </h3>
                        <span className="text-zinc-400 text-sm leading-4">
                          {parseMembers(community.members)} Membros
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => joinCommunity(community.link)}
                      className="rounded-md bg-zinc-700 transition-colors text-zinc-400 hover:text-zinc-200 font-medium text-sm px-2 py-1 h-fit border border-zinc-600"
                    >
                      Entrar
                    </button>
                  </div>
                ))
              ) : (
                <div>Nenhum resultado encontrado</div>
              )}
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
}

export default App;
