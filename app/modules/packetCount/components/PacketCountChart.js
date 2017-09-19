import React from 'react';
import PropTypes from 'prop-types';
import { VictoryBar, VictoryChart, VictoryLabel } from 'victory';
import numeral from 'numeral';


const PacketCountChart = ({ data }) => {
    if (!data) {
        return null;
    }

    return (
        <VictoryChart
            width={1400}
            height={800}
            padding={{ left: 100, top: 50, bottom: 50, right: 50 }}
            domainPadding={{ x: 100 }}
            animate={{duration: 500, onLoad: {duration: 1000}}}
            easing="linear"
        >
            <VictoryBar
                data={data}
                style={{
                    data: { fill: "steelblue" },
                }}
                labels={d => numeral(d.y).format('0a')}
                labelComponent={<VictoryLabel />}
            />
        </VictoryChart>
    );
};


PacketCountChart.propTypes = {
    data: PropTypes.array.isRequired,
};


export default PacketCountChart;
