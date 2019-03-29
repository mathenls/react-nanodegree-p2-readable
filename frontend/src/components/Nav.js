import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Menu, Icon } from 'antd'

class Nav extends React.Component {
  render()  {
      const { categories } = this.props
      const { listOfCategories } = categories

      return (
        <Menu
            mode="horizontal"
        >
            <Menu.Item key='/'>
                <NavLink to='/' exact activeClassName='active'>
                   <Icon type='home' /> Readable
                </NavLink>
            </Menu.Item>
            {listOfCategories.map((c) => (
                <Menu.Item key={c.path}>
                    <NavLink to={`/${c.path}`} exact activeClassName='active'>
                        {c.name}
                    </NavLink>
                </Menu.Item>
            ))}
        </Menu>
      )
    }
}
function mapStateToProps ({ categories }) {
    return {
        categories
    }
}

export default connect(mapStateToProps)(Nav)

