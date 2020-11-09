import logo200Image from 'assets/img/logo/logo.png';
import sidebarBgImage from 'assets/img/sidebar/sidebar-8.jpg';
import SourceLink from 'components/SourceLink';
import React from 'react';

import {
  MdAccountCircle,
  MdDashboard,
  MdKeyboardArrowDown,
  MdVerifiedUser,
  MdAccountBalance,
  MdAssignmentInd,
  MdEvent,
  MdLibraryBooks,
  MdBeachAccess,
  MdPeople,
  MdAssignment,
  MdSchool,
  MdBook,
  MdHourglassFull,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  // UncontrolledTooltip,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};




const adminPages = [
  { to: '/users', name: 'Manage Users', exact: false, Icon: MdAccountCircle },
  { to: '/view_users', name: 'View Users', exact: false, Icon: MdAccountCircle },
];

const employeePages = [
  { to: '/employees', name: 'Manage Employees', exact: false, Icon: MdAccountCircle },
  { to: '/view_employees', name: 'View Employees', exact: false, Icon: MdAccountCircle },
];

const leavePages = [
  { to: '/approve_leave_application', name: 'Approve Leave Application', exact: false, Icon: MdAccountCircle },
  { to: '/approve_for_leave', name: 'Apply for Leave', exact: false, Icon: MdAccountCircle },
  { to: '/View_leave_plan', name: 'View Leave Plan', exact: false, Icon: MdAccountCircle },
  { to: '/create_leave_plan', name: 'Create Leave Plan', exact: false, Icon: MdAccountCircle },
  { to: '/approve_leave_plan', name: 'Approve Leave Plan', exact: false, Icon: MdAccountCircle },
];

const payrollPages = [
  { to: '/manage_payroll_records', name: 'Manage Payroll Records', exact: false, Icon: MdAccountCircle },
  { to: '/View_payroll_records', name: 'View Payroll Records', exact: false, Icon: MdAccountCircle },
];

const holidayPages = [
  { to: '/manage_holidays', name: 'Manage Holidays', exact: false, Icon: MdAccountCircle },
];

const recruitmentPages = [
  { to: '/manage_job_advertisement', name: 'Manage Job Advertisement', exact: false, Icon: MdAccountCircle },
  { to: '/view_available_jobs', name: 'View Available Jobs', exact: false, Icon: MdAccountCircle },
  { to: '/view_job_applications', name: 'View Job Applications', exact: false, Icon: MdAccountCircle },
];

const contractPages = [
  { to: '/manage_job_contracts', name: 'Manage Job Contracts', exact: false, Icon: MdAccountCircle },
  { to: '/view_employee_contracts', name: 'View Employee Contracts', exact: false, Icon: MdAccountCircle },
];

const trainingPages = [
  { to: '/approve_training_application', name: 'Approve Training Application', exact: false, Icon: MdAccountCircle },
  { to: '/apply_training_application', name: 'Apply for Training', exact: false, Icon: MdAccountCircle },
  { to: '/schedule_training', name: 'Schedule Training', exact: false, Icon: MdAccountCircle },
  { to: '/view_training_schedules', name: 'View Training Schedules', exact: false, Icon: MdAccountCircle },
];
//Learning and development pages
const landPages = [
  { to: '/manage_resources', name: 'Manage Resources', exact: false, Icon: MdAccountCircle },
  { to: '/view_resources', name: 'View Resources', exact: false, Icon: MdAccountCircle },

];

const organisationPages = [
  { to: '/manage_job_positions', name: 'Manage Job Positions', exact: false },
  { to: '/manage_departments', name: 'Manage Departments', exact: false },
  { to: '/manage_teams', name: 'Manage Teams', exact: false },

];

const overtimePages = [
  { to: '/approve_overtime', name: 'Approve overtime', exact: true, Icon: MdDashboard },
  { to: '/apply_for_overtime', name: 'Apply for overtime', exact: true, Icon: MdDashboard },
  { to: '/view_overtime_applications', name: 'View Overtime Applications', exact: true, Icon: MdDashboard },
  { to: '/create_overtime_plan', name: 'Create Overtime Plan', exact: true, Icon: MdDashboard },
  { to: '/approve_overtime_plan', name: 'Approve Overtime Plan', exact: true, Icon: MdDashboard },
];

const navItems = [
  { to: '/', name: 'Dashboard', exact: true, Icon: MdDashboard },

];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenAdmin: false,
    isOpenOrganisation: false,
    isOpenEmployees:false,
    isOpenLeave:false,
    isOpenPayroll:false,
    isOpenOvertime:false,
    isOpenHoliday:false,
    isOpenRecruitment:false,
    isOpenContracts:false,
    isOpenTraining: false,
    //Learning and development
    isOpenLand:false,

  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
          <Navbar>
            <SourceLink className="navbar-brand d-flex">
              <img
                src={logo200Image}
                width="40"
                height="30"
                className="pr-2"
                alt=""
              />
              <span className="text-white">Soliton Bakozi</span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {/*Vertical Navbar Items*/}
            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Admin')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdVerifiedUser className={bem.e('nav-item-icon')} />
                  <span className="">Admin</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenAdmin
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenAdmin}>
              {adminPages.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className=""
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>


            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className=""
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Organisation')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdAccountBalance className={bem.e('nav-item-icon')} />
                  <span className="">Organisation</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenOrganisation
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenOrganisation}>
              {organisationPages.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className=""
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Employees')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdAssignmentInd className={bem.e('nav-item-icon')} />
                  <span className="">Employees</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenEmployees
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenEmployees}>
              {employeePages.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className=""
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Leave')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdEvent className={bem.e('nav-item-icon')} />
                  <span className="">Leave</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenLeave
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenLeave}>
              {leavePages.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className=""
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Payroll')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdLibraryBooks className={bem.e('nav-item-icon')} />
                  <span className="">Payroll</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenPayroll
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenPayroll}>
              {payrollPages.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className=""
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Overtime')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdHourglassFull className={bem.e('nav-item-icon')} />
                  <span className="">Overtime</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenOvertime
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenOvertime}>
              {overtimePages.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className=""
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>


            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Holiday')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdBeachAccess className={bem.e('nav-item-icon')} />
                  <span className="">Holiday</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenHoliday
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenHoliday}>
              {holidayPages.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className=""
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Recruitment')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPeople className={bem.e('nav-item-icon')} />
                  <span className="">Recruitment</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenRecruitment
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenRecruitment}>
              {recruitmentPages.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className=""
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Contracts')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdAssignment className={bem.e('nav-item-icon')} />
                  <span className="">Contracts</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenContracts
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenContracts}>
              {contractPages.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className=""
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Training')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdSchool className={bem.e('nav-item-icon')} />
                  <span className="">Training</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenTraining
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenTraining}>
              {trainingPages.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className=""
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Land')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdBook className={bem.e('nav-item-icon')} />
                  <span className="">Learning & Development</span>
                </div>
                <MdKeyboardArrowDown
                  className={bem.e('nav-item-icon')}
                  style={{
                    padding: 0,
                    transform: this.state.isOpenLand
                      ? 'rotate(0deg)'
                      : 'rotate(-90deg)',
                    transitionDuration: '0.3s',
                    transitionProperty: 'transform',
                  }}
                />
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenLand}>
              {landPages.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className=""
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
