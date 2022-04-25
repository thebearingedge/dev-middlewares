import React from 'react';

const HashRouterContext = React.createContext({
  path: '',
  params: {},
  navigate: () => {},
  redirect: () => {}
});

export class HashRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      router: this.createRouter(window.location.hash)
    };
    this.handleHashchange = this.handleHashchange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleHashchange);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashchange);
  }

  handleHashchange() {
    const router = this.createRouter(window.location.hash);
    this.setState({ router });
  }

  createRouter(hash) {
    const [path, search = ''] = hash.replace(/^#/, '').split('?');
    const params = Object.fromEntries(new URLSearchParams(search));
    return {
      path,
      params,
      redirect: hash => {
        const url = new URL(window.location.href);
        url.hash = hash;
        window.location.replace(url);
      },
      navigate: hash => {
        window.location.hash = hash;
      }
    };
  }

  render() {
    return React.createElement(
      HashRouterContext.Provider,
      { value: this.state.router },
      this.props.children
    );
  }
}

export const Link = React.forwardRef(Object.assign((props, ref) => {
  const href = props.href.startsWith('#')
    ? props.href
    : '#' + props.href;
  return React.createElement('a', { ...props, ref, href });
}, { displayName: 'Link' }));

export class Redirect extends React.Component {

  static contextType = HashRouterContext;

  componentDidMount() {
    this.context.redirect(this.props.to);
  }

  render() {
    return null;
  }
}

export class Route extends React.Component {

  static defaultProps = { path: '' };

  static contextType = HashRouterContext;

  render() {
    if (this.props.path !== this.context.path) return null;
    if (this.props.children != null) return this.props.children;
    if (this.props.component != null) {
      return React.createElement(
        this.props.component,
        { ...this.props, router: { ...this.context } }
      );
    }
    return null;
  }
}

export function withRouter(Component) {
  return class extends React.Component {

    static displayName = `withRouter(${Component.name})`;

    static contextType = HashRouterContext;

    render() {
      return React.createElement(
        Component,
        { ...this.props, router: { ...this.context } }
      );
    }
  };
}
