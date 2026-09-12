import GamesBrowser from "../../components/games/GamesBrowser";

export const metadata = {
    title: "Free Browser Brain & Puzzle Games",
    description:
        "Explore all PUZEXA browser games. Play free memory, logic, math, word, reaction and daily brain challenges instantly with no download required.",

    alternates: {
        canonical: "/games",
    },

};

export default function GamesPage() {
    return <GamesBrowser />;
}