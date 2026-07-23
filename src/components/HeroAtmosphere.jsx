/** Laconic animated atmosphere behind hero content */
export function HeroAtmosphere() {
  return (
    <div className="hero-atmosphere" aria-hidden="true">
      <span className="hero-orb hero-orb--a" />
      <span className="hero-orb hero-orb--b" />
      <span className="hero-frame hero-frame--a" />
      <span className="hero-frame hero-frame--b" />
      <span className="hero-frame hero-frame--c" />
      <div className="hero-sparks">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
