import React from 'react';

const RouterContext = React.createContext({
  url: new URL('/', window.location.href),
  navigate: () => {},
  redirect: () => {}
});

export class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: new URL(window.location.href)
    };
    this.navigate = this.navigate.bind(this);
    this.redirect = this.redirect.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
  }

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  handlePopState() {
    this.setState({ url: new URL(window.location.href) });
  }

  navigate(to) {
    const url = new URL(to, window.location.host);
    window.history.pushState(null, '', url);
    this.setState({ url });
  }

  redirect(to) {
    const url = new URL(to, window.location.host);
    window.history.replaceState(null, '', url);
    this.setState({ url });
  }

  render() {
    const { url } = this.state;
    const { navigate, redirect } = this;
    return React.createElement(
      RouterContext.Provider,
      { value: { url, navigate, redirect } },
      this.props.children
    );
  }
}

export class Route extends React.Component {

  static defaultProps = { path: '/' };

  static contextType = RouterContext;

  render() {
    if (this.props.path !== this.context.url.pathname) return null;
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

export const Link = React.forwardRef(Object.assign((props, ref) => {
  return React.createElement(
    RouterContext.Consumer,
    null,
    router => {
      const handleClick = event => {
        event.preventDefault();
        if (router.url.href === event.target.href) return;
        router.navigate(event.target.href);
      };
      return React.createElement(
        'a',
        { ...props, ref, onClick: handleClick }
      );
    }
  );
}, { displayName: 'Link' }));

export class Redirect extends React.Component {

  static contextType = RouterContext;

  componentDidMount() {
    this.context.redirect(this.props.to);
  }

  render() {
    return null;
  }
}

export function withRouter(Component) {
  return class extends React.Component {

    static displayName = `withRouter(${Component.name})`;

    static contextType = RouterContext;

    render() {
      return React.createElement(
        Component,
        { ...this.props, router: { ...this.context } }
      );
    }
  };
}
