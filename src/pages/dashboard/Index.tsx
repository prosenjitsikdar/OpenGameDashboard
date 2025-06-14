import { useState } from 'react';
import {MetricsCards, AnalyticsSection, BetsTable, H1, P} from "../../components/wrapperComponents";
import {metricCardsData, sportsData, pendingBetsData, settledBetsData, } from '../../data/mockData';


const Dashboard = () => {

    const [userNameSearch] = useState('');
    const [sportType] = useState('');
    const [event] = useState('');
    const [market] = useState('');
    const [betType] = useState('');
    const [dateRange] = useState({ start: '', end: '' });

    return (
        <div className="space-y-5 px-4 py-4">
            <div>
                <H1 text="Sport Admin Dashboard"/>
                <P text="Track, analyze, and manage sports betting activity"/>
            </div>
            <MetricsCards metrics={metricCardsData} className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8" />
            <AnalyticsSection sports={sportsData} />
            
            <BetsTable
                bets={settledBetsData}
                title="Settled Bets"
                type="settled"
                filters={{
                    userNameSearch,
                    sportType,
                    event,
                    market,
                    betType,
                    dateRange,
                    status
                }}
            />

            <BetsTable
                bets={pendingBetsData}
                title="Pending Bets"
                type="pending"
                filters={{
                userNameSearch,
                sportType,
                event,
                market,
                betType,
                dateRange,
                status
                }}
            />
        </div>
    );
};

export default Dashboard;
