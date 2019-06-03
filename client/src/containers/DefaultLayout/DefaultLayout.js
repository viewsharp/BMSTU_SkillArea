import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container} from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import {admin_nav, user_nav} from '../../_nav';
// routes config
import {admin_routes, user_routes} from '../../routes';

import {ACCESS_ID_STORAGE_KEY} from '../../settings.js'
import sessionService from '../../services/session'
import groupService from "../../services/group";
import disciplineService from "../../services/discipline";

const DefaultAside = React.lazy(() => import('./DefaultAside'));
const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: {items: []},
      routes: []
    };
  }

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  async signOut(e) {
    e.preventDefault();
    localStorage.removeItem(ACCESS_ID_STORAGE_KEY);
    this.props.history.push('/login');
  }

  async componentWillMount() {
    const access_id = localStorage.getItem(ACCESS_ID_STORAGE_KEY);
    if (access_id) {
      try {
        const admin = (await sessionService.get()).category === 'admin';
        await sessionService.get();
        const group = await groupService.get();

        if (group) {
          const disciplines = await disciplineService.getList(group.id);
          this.setState({
            navigation: admin ? admin_nav() : user_nav(disciplines),
            routes: admin ? admin_routes : user_routes
          });
        } else {
          this.setState({
            routes: user_routes
          });
        }

        return;
      } catch (e) {
        localStorage.removeItem(ACCESS_ID_STORAGE_KEY);
      }
    }

    this.props.history.push('/login');
  }

  render() {
    return (
        <div className="app">
          <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <DefaultHeader onLogout={e => this.signOut(e)}/>
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader/>
              <AppSidebarForm/>
              <Suspense>
                <AppSidebarNav navConfig={this.state.navigation} {...this.props} />
              </Suspense>
              <AppSidebarFooter/>
              <AppSidebarMinimizer/>
            </AppSidebar>
            <main className="main">
              <AppBreadcrumb appRoutes={this.state.routes}/>
              <Container fluid>
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {this.state.routes.map((route, idx) => {
                      return route.component ? (
                          <Route
                              key={idx}
                              path={route.path}
                              exact={route.exact}
                              name={route.name}
                              render={props => (
                                  <route.component {...props} />
                              )}/>
                      ) : (null);
                    })}
                    <Redirect from="/" to="/home"/>
                  </Switch>
                </Suspense>
              </Container>
            </main>
            <AppAside fixed>
              <Suspense fallback={this.loading()}>
                <DefaultAside/>
              </Suspense>
            </AppAside>
          </div>
          <AppFooter>
            <Suspense fallback={this.loading()}>
              <DefaultFooter/>
            </Suspense>
          </AppFooter>
        </div>
    );
  }
}

export default DefaultLayout;
