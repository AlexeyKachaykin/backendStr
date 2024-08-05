const { db } = require('../data-access/database');

async function getStats(userId) {
    const userBets = await db('bet').where({ user_id: userId });
    const totalBets = userBets.length;
    const wonBets = userBets.filter(bet => bet.status === 'won').length;
    const lostBets = userBets.filter(bet => bet.status === 'lost').length;

    const transactions = await db('transaction').where({ user_id: userId });
    const totalDeposits = transactions.filter(t => t.type === 'deposit').reduce((sum, t) => sum + t.amount, 0);
    const totalWithdrawals = transactions.filter(t => t.type === 'withdrawal').reduce((sum, t) => sum + t.amount, 0);

    const totalUsers = await db('user').count('id as count').first();
    const totalEvents = await db('event').count('id as count').first();

    return {
        totalBets,
        wonBets,
        lostBets,
        winRate: totalBets > 0 ? (wonBets / totalBets) * 100 : 0,
        totalDeposits,
        totalWithdrawals,
        netProfit: totalDeposits - totalWithdrawals,
        totalUsers: parseInt(totalUsers.count),
        totalEvents: parseInt(totalEvents.count)
    };
}

module.exports = {
    getStats
};