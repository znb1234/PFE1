import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartTooltip,
    ChartSeries,
    ChartSeriesItem,
    ChartSeriesLabels,
} from "@progress/kendo-react-charts";

const COLORS = {
   software: "#B91C1C",
  marketing: "#D97706",
  IOT : "#2563EB",
};


const getPercentage = (num, total) =>
    Math.round((num / total) * 100).toFixed(2);

const numPostM = 75;
const numPostS = 24;
const numPostI = 46;
const totalPosts = numPostM + numPostS + numPostI;

const applicants = [
    {
        status: "Marketing",
        value: getPercentage(numPostM, totalPosts),
        color: COLORS.software,
    },
    {
        status: "Software",
        value: getPercentage(numPostS, totalPosts),
        color: COLORS.marketing,
    },
    {
        status: "IOT",
        value: getPercentage(numPostI, totalPosts),
        color: COLORS.IOT,
    },
];

const renderTooltip = context => {
    const { category, value } = context.point || context;
    return (
        <div>
            {category}: {value}%
        </div>
    );
};

const MostPopularJob = props => {
    return (
        <div>
            <div className="k-mb-4">
                les publications les mieux notées "
            </div>

            <Chart style={{ minHeight: "20rem" }}>
                <ChartTitle text="catégories des publications " />
                <ChartLegend visible={false} />
                <ChartTooltip render={renderTooltip} />
                <ChartSeries>
                    <ChartSeriesItem
                        type="donut"
                        data={applicants}
                        categoryField="status"
                        field="value"
                    >
                        <ChartSeriesLabels
                            color="#fff"
                            background="none"
                            content={e => e.category}
                        />
                    </ChartSeriesItem>
                </ChartSeries>
            </Chart>
        </div>
    );
};

export default MostPopularJob;