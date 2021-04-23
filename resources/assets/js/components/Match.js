// eslint-disable-next-line
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'

import * as cm from '../helpers/calculate-midpoints'

class Match extends Component {
  constructor(props) {
    super(props)

    this.state = {
      padding: 3,     
    }
  }

  componentDidMount() {
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions)
  }

  handleMouseOver = (refid, props) => {
    return () => {
      if (!props.handleBroadcastHoverTargetClass) {
        return
      }
      const obj = this.refs[refid]
      var style = window.getComputedStyle(obj, null)
      props.handleBroadcastHoverTargetClass({
        className: obj.className,
        color: style['border-left-color'],
      })
      obj.classList.add('team-hover')
    }
  }

  handleMouseOut = (refid, props) => {
    return () => {
      const obj = this.refs[refid]
      obj.classList.remove('team-hover')
      if (props.handleBroadcastHoverTargetClass) {
        props.handleBroadcastHoverTargetClass(null)
      }
      
    }
  }

  updateDimensions = () => {
    const team1Node = ReactDOM.findDOMNode(this.refs.team1)
    const team1Rect = team1Node.getBoundingClientRect()
    const team2Node = ReactDOM.findDOMNode(this.refs.team2)
    const team2Rect = team2Node.getBoundingClientRect()
    const team3Node = ReactDOM.findDOMNode(this.refs.team3)
    const team3Rect = team3Node.getBoundingClientRect()
    const team4Node = ReactDOM.findDOMNode(this.refs.team4)
    const team4Rect = team4Node.getBoundingClientRect()
    const padding = this.state.padding

    const team1Midpoints = cm.calculateMidpoints(team1Rect, padding)
    const team2Midpoints = cm.calculateMidpoints(team2Rect, padding)
    const team3Midpoints = cm.calculateMidpoints(team3Rect, padding)
    const team4Midpoints = cm.calculateMidpoints(team4Rect, padding)
  
    const {
      handleBroadcastMidpoints,
      match,
    } = this.props

    if (handleBroadcastMidpoints){
      handleBroadcastMidpoints(
        {
            team1: Object.assign({}, 
                team1Midpoints,
                {
                teamkey: match.team1.team.key,
                }),
            team2: Object.assign({}, 
                team2Midpoints,
                {
                teamkey: match.team2.team.key,
                }),
            team3: Object.assign({}, 
                team3Midpoints,
                {
                  teamkey: match.team3.team.key,
                }),
            team4: Object.assign({}, 
                team4Midpoints,
                {
                    teamkey: match.team4.team.key,
                }),
        }
      )
    }
  }

  renderTeam(team, idx){
    const {
      hoverTargetClass,
    } = this.props
    const className = 'team team-winner team-' + team.team.key
    let styleCss = null
    if (hoverTargetClass && hoverTargetClass.className.indexOf(className) > -1) {
      styleCss = { backgroundColor: hoverTargetClass.color }
    }
    
    return (
      <div className={className}
        data-team={team.team.key} ref={'team'+idx}
        onMouseOver={this.handleMouseOver('team'+idx, this.props)}
        onMouseOut={this.handleMouseOut('team'+idx, this.props)}
        style={styleCss}
      >
        <span className="team-seed">{team.team.seed}</span>
        <span className="team-name">{team.team.name}</span>
        <span className="team-score">{team.score}</span>
      </div>
    )
  }

  renderMatch(match) {
    return (
      <article className="game" ref='match'>
        {this.renderTeam(match.team1, 1)}
        {this.renderTeam(match.team2, 2)}
        {this.renderTeam(match.team3, 3)}
        {this.renderTeam(match.team4, 4)}
      </article>
    )
  }

  

  render() {
    const { match } = this.props
    if (match) {
      return (
          this.renderMatch(match)
      )
    }
  }
}

Match.propTypes = {
  handleBroadcastMidpoints: PropTypes.func,
  match: PropTypes.object,  
  hoverTargetClass: PropTypes.object,
  handleBroadcastHoverTargetClass: PropTypes.func,
}

export default Match;