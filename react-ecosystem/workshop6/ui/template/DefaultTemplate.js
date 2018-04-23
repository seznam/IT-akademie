import Link from 'next/link';
import PropTypes from 'prop-types';
import '~/ui/atom/atoms.css';
import SearchForm from '~/ui/organism/searchForm/SearchForm';
import '~/ui/template/defaultTemplate.css';

export default function DefaultTemplate({children}) {
  return (
    <div className="tpl-main-layout">
      <header className="tpl-main-layout-header">
        <div className="tpl-main-layout-header-content">
          <Link href={{pathname: '/'}}>
            <a className="tpl-main-layout-logo">
              <h1>SFlix</h1>
            </a>
          </Link>
          <SearchForm/>
        </div>
      </header>
      <main className="tpl-main-layout-main">
        {children}
      </main>
      <footer className="tpl-main-layout-footer">
        Seznam.cz &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

DefaultTemplate.organisms = [
  SearchForm,
];

DefaultTemplate.propTypes = {
  children: PropTypes.node.isRequired,
};
