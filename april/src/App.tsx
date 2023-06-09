import { Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { GithubIcon } from "./assets/GithubIcon";
import { SearchIcon } from "./assets/SearchIcon";
import { Community } from "./components/Community";

async function fetchCommunities(query: string, controller: AbortController) {
  return fetch(`https://discord.com/api//discovery/search?query=${query}&limit=12`, {
    signal: controller.signal,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Não foi possível pegar os dados :(");
  });
}

function App() {
  // preguiça de tipar
  const [communities, setCommunities] = useState<any[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const [isFocused, setIsFocused] = useState(false);
  const [search, setSearch] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  const keyDownHandler = (e: KeyboardEvent) => {
    if (inputRef.current) {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        inputRef.current.focus();
      }

      if (e.key === "Escape") {
        e.preventDefault();
        inputRef.current.blur();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);

    const controller = new AbortController();

    let dataTimeout = setTimeout(() => {
      setLoading(true);
      fetchCommunities(search, controller)
        .then((data) => {
          setCommunities(data.hits);
          setError(null);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    }, 500);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      controller.abort();
      clearTimeout(dataTimeout);
      setLoading(false);
    };
  }, [search]);
  return (
    <div className="bg-zinc-900 py-8 min-h-screen flex items-center justify-center">
      <a
        href="https://github.com/richaardev/ballerini-challenges"
        className="absolute top-5 right-5"
      >
        <GithubIcon />
      </a>
      <div className="flex flex-col w-full mx-2 max-w-[560px] items-center gap-10">
        <img className="w-16 h-16" src="/writting.png" />
        <div className="text-center">
          <h1 className="text-3xl text-zinc-100 font-semibold">Faça algo mágico...</h1>
          <h2 className="text-2xl text-zinc-400">Ache sempre tudo em um só lugar!</h2>
        </div>
        <div className="bg-zinc-800 flex flex-col px-6 min-h-14 rounded-lg w-full">
          <label className="peer group/input flex gap-3 items-center">
            <SearchIcon />
            <input
              id="input"
              ref={inputRef}
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
              {loading ? (
                <div className="text-zinc-400 text-center">Carregando resultados...</div>
              ) : error != null ? (
                <div className="text-zinc-400 text-center">{error}</div>
              ) : communities.length < 1 ? (
                <div className="text-zinc-400 text-center">Nenhum resultado encontrado</div>
              ) : (
                communities.map((community) => <Community community={community} />)
              )}
            </div>
          </Transition>
        </div>
      </div>
    </div>
  );
}

export default App;
