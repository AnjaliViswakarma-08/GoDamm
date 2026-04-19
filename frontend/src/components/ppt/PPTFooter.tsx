export default function PPTFooter() {
  return (
    <footer className="w-full mt-16">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="py-5 text-center">
        <p className="text-slate-500 text-xs">
          GoDamm &copy; {new Date().getFullYear()} &mdash; Made with ❤️
        </p>
      </div>
    </footer>
  );
}
