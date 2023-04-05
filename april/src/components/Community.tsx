type CommunityProps = {
  community: any;
};

export const Community: React.FC<CommunityProps> = ({ community }) => {
  let format = "png";
  if (community.icon.startsWith("a_")) format = "gif";

  const parseMembers = (members: number) =>
    Intl.NumberFormat("en", {
      notation: "compact",
    }).format(members);

  const joinCommunity = (code: string) => {
    window.open(`https://discord.gg/${code}`, "_blank");
  };

  return (
    <div key={community.id} className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {community.icon ? (
          <img
            className="rounded-lg w-10 h-10"
            src={`https://cdn.discordapp.com/icons/${community.id}/${community.icon}.${format}`}
          />
        ) : (
          <div className="rounded-lg w-10 h-10 bg-zinc-700" />
        )}
        <div className="flex flex-col">
          <h3 className="font-medium text-zinc-200 text-lg leading-5">{community.name}</h3>
          <span className="text-zinc-400 text-sm leading-4">
            {parseMembers(community.approximate_member_count)} Membros
          </span>
        </div>
      </div>
      <button
        onClick={() => joinCommunity(community.vanity_url_code)}
        className="rounded-md bg-zinc-700 transition-colors text-zinc-400 hover:text-zinc-200 font-medium text-sm px-2 py-1 h-fit border border-zinc-600"
      >
        Entrar
      </button>
    </div>
  );
};
