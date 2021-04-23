export const mapConnectors = (round, index, roundMidpoints) => {
    let mapped = round;
    const midpointlabel = round.showSConnector ? 'left' : 'center';
    mapped.matches = round.matches.map(
      (match) => {
        let mappedMatch = match;
        if (index > 0) 
        {      
          mappedMatch.team1.end = match.team1[midpointlabel];
          mappedMatch.team2.end = match.team2[midpointlabel];
          mappedMatch.team3.end = match.team3[midpointlabel];
          mappedMatch.team4.end = match.team4[midpointlabel];
          mappedMatch.team1.start = findPrevRoundMidpoint(match.team1.teamkey, roundMidpoints[index-1])
          mappedMatch.team2.start = findPrevRoundMidpoint(match.team2.teamkey, roundMidpoints[index-1])
          mappedMatch.team3.start = findPrevRoundMidpoint(match.team3.teamkey, roundMidpoints[index-1])
          mappedMatch.team4.start = findPrevRoundMidpoint(match.team4.teamkey, roundMidpoints[index-1])
        }
        
        return mappedMatch;
      }, [],
    )
  
    return mapped;
}
  
  
export const findPrevRoundMidpoint = (teamKey, prevRound) => {
    if (!(prevRound.matches && prevRound.matches.length)) {
      return null;
    }
  
    const prevMatch = prevRound && prevRound.matches.find((current) => {
        return (teamKey === current.team1.teamkey) || (teamKey === current.team2.teamkey) || (teamKey === current.team3.teamkey) || (teamKey === current.team4.teamkey)
      });
  
    if (prevMatch !== null)   {
      if (prevMatch.team1.teamkey === teamKey) {
        return prevMatch.team1.right;
      }
      else if (prevMatch.team2.teamkey === teamKey) {
        return prevMatch.team2.right;
      }
      else if (prevMatch.team3.teamkey === teamKey) {
        return prevMatch.team3.right;
      }
      else if (prevMatch.team4.teamkey === teamKey) {
        return prevMatch.team4.right;
      }
    }
  
    return null;
}