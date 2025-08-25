export default function SiteFooter() {
  return (
    <footer className="mt-16 border-t">
      <div className="container mx-auto grid gap-6 py-10 text-sm md:grid-cols-3">
        <div>
          <p className="font-semibold">HAIO</p>
          <p className="text-muted-foreground mt-2">
            Learning by the water: courses, stories, events, and competitions.
          </p>
        </div>
        <div>
          <p className="font-semibold">Explore</p>
          <ul className="text-muted-foreground mt-2 space-y-1">
            <li>
              <a href="/courses" className="hover:text-foreground">
                Courses
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-foreground">
                Blog
              </a>
            </li>
            <li>
              <a href="/events" className="hover:text-foreground">
                Events
              </a>
            </li>
            <li>
              <a href="/leaderboard" className="hover:text-foreground">
                Leaderboard
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">About</p>
          <p className="text-muted-foreground mt-2">
            © {new Date().getFullYear()} HAIO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
