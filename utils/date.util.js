// Bugungi sanani olish funksiyasi
function getToday() {
    const currentDate = new Date();

    const dateOnly = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    return dateOnly;
}

module.exports = { getToday };
