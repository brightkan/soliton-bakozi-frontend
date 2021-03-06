import { UserCard } from 'components/Card';
import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';
import { notificationsData } from 'demos/header';
import withBadge from 'hocs/withBadge';
import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdNotificationsActive,
  MdNotificationsNone,
  MdPersonPin,
  MdSettingsApplications,
  MdAccountCircle,
  MdLibraryBooks,
  MdHourglassFull,
  MdSchool,
  MdAssignment,
  MdEvent,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
} from 'reactstrap';
import bn from 'utils/bemnames';
import { getCurrentUser } from '../../services/authService';
import { loadUsers } from '../../redux/actions/userActions';
import PropTypes from 'prop-types';
import { loadEmployees } from '../../redux/actions/employeeActions';
import { loadSolitonUsers } from '../../redux/actions/solitonUserActions';




const bem = bn.create('header');

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>{notificationsData.length}</small>,
})(MdNotificationsActive);

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: true,
    isOpenUserCardPopover: false,
    userFromToken:{}
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  setIsNotificationsConfirmed = notificationsData => {
    if(notificationsData.length>0){
      this.setState({isNotificationConfirmed: false})
    }
  };

  componentDidMount() {
    this.setIsNotificationsConfirmed(notificationsData)
    this.userFromToken = getCurrentUser();
    this.props.loadUsers();
    this.setState(this.userFromToken)
    this.props.loadEmployees();
    this.props.loadSolitonUsers();

  }


  render() {
    const { isNotificationConfirmed } = this.state;
    const {
      currentUser,
      currentSolitonUser,
      employees
               } = this.props;

    const currentEmployee = employees && currentSolitonUser && (employees.filter(employee=>(employee.id===currentSolitonUser.employee)))[0];


    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar>
          <SearchInput />
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
              {isNotificationConfirmed ? (
                <MdNotificationsNone
                  size={25}
                  className="text-secondary can-click"
                  onClick={this.toggleNotificationPopover}
                />
              ) : (
                <MdNotificationsActiveWithBadge
                  size={25}
                  className="text-secondary can-click animated swing infinite"
                  onClick={this.toggleNotificationPopover}
                />
              )}
            </NavLink>
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenNotificationPopover}
              toggle={this.toggleNotificationPopover}
              target="Popover1"
            >
              <PopoverBody>
                <Notifications notificationsData={notificationsData} />
              </PopoverBody>
            </Popover>
          </NavItem>

          <NavItem>
            <NavLink id="Popover2">
              {/*<Avatar*/}
              {/*  onClick={this.toggleUserCardPopover}*/}
              {/*  className="can-click"*/}
              {/*/>*/}
              <MdPersonPin
                size={25}
                className="text-secondary can-click"
                onClick={this.toggleUserCardPopover}
              />
            </NavLink>
            <Popover
              placement="bottom-end"
              isOpen={this.state.isOpenUserCardPopover}
              toggle={this.toggleUserCardPopover}
              target="Popover2"
              className="p-0 border-0"
              style={{ minWidth: 250 }}
            >
              <PopoverBody className="p-0 border-light">
                <UserCard
                  title={currentEmployee&&currentEmployee.first_name}
                  subtitle={currentUser&&currentUser.email}
                  className="border-light"
                >
                  <ListGroup flush>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdAccountCircle/> Your Profile
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdLibraryBooks /> Your Payslip
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdHourglassFull/> Your Overtime Applications
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdSchool/> Your Training Programs
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdEvent/> Your Leave Application
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdAssignment/> Your Contracts
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdSettingsApplications /> Settings
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdHelp/> Help
                    </ListGroupItem>
                    <Link to="/logout">
                      <ListGroupItem tag="button" action className="border-light">
                        <MdExitToApp /> Logout
                      </ListGroupItem>
                    </Link>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

Header.propTypes = {
  loadUsers: PropTypes.func.isRequired,
  loadSolitonUsers: PropTypes.func.isRequired,
  loadEmployees: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
};

const userFromToken = getCurrentUser();

const mapStateToProps=(state) =>{
  return {
    currentUser: state.users.filter(user => (user.id === userFromToken.user_id))[0],
    currentSolitonUser: state.solitonUsers.filter(solitonUser=>(solitonUser.user === userFromToken.user_id))[0],
    employees: state.employees,
  };
}

export default connect(mapStateToProps,{loadUsers,loadEmployees,loadSolitonUsers})(Header);
