import './nav.styles.scss';

export const Nav = () => {
  const links = [
    {
      name: 'home',
      path: '/',
    },
    {
      name: 'reset',
      path: '/reset',
    },
  ];

  return (
    <div className="nav">
      <div className="title">
        <h1>calculator</h1>
      </div>
      <div className="links">
        {links.map(({ name, path }) => (
          <a href={path} key={name}>{name}</a>
        ))}
      </div>
    </div>
  );
};
