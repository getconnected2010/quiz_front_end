import React from 'react'

//score table to display results from score-table api calls
const ScoreTable = ({array, onClick}) => {
    return (
        <div>
            <table>
                <tbody>
                    <>
                        {
                            array.map(score=>(
                                    <tr key={score.subject}>
                                        <td>{score.subject}</td>
                                        <td>{score.score}</td>
                                    </tr>
                            ))
                        }
                        <tr>
                            <td>
                                <button onClick={onClick}>Hide score table</button>
                            </td>
                        </tr>
                    </>
                </tbody>
                
            </table>
            
        </div>
    )
}
export default ScoreTable