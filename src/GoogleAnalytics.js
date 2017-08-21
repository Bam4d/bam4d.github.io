import React from 'react';
import ReactGA from 'react-ga';

class GoogleAnalytics extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    ReactGA.initialize('UA-105073242-1');
  }

  componentDidMount() {
    this.sendPageView(this.context.router.history.location);
    this.context.router.history.listen(this.sendPageView);
  }

  sendPageView(location) {
    console.log(location);
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
  }

  render() {
    return this.props.children;
  }
}

export default GoogleAnalytics;