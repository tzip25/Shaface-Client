import React from 'react';
import { Icon, Statistic } from 'semantic-ui-react'
import { connect } from 'react-redux'

class Stats extends React.Component {

  render(){
    const {siteStats} = this.props
    return(
    <Statistic.Group width='two'>
      <Statistic>
        <Statistic.Value>
          <Icon name='users' />
          {siteStats.actors}
        </Statistic.Value>
        <Statistic.Label>Actors Found</Statistic.Label>
      </Statistic>
      <Statistic>
        <Statistic.Value>
          <Icon name='search' />
          {siteStats.searches}
        </Statistic.Value>
        <Statistic.Label>Searches Run</Statistic.Label>
      </Statistic>
    </Statistic.Group>
    )
  }
}


function mapStateToProps(state) {
  return {
    siteStats: state.siteStats,
  }
}

export default connect(mapStateToProps)(Stats);
