import React from 'react';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import moment from 'moment';


const PacketCountChart = ({ data }) => {
    return (
        <VictoryChart
            theme={VictoryTheme.material}
            width={1400}
            height={800}
            padding={100}
            animate={{duration: 500, onLoad: {duration: 1000}}}
            easing="linear"
        >
            <VictoryLine
                interpolation="linear"
                data={data}
                x={d => moment(d.when).format('hh:mm:ss')}
                scale="log"
            />
        </VictoryChart>
    );
};


export default PacketCountChart;