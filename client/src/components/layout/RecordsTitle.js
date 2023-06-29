const getStyles = () => ({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        padding: "15px",
        marginBottom: "15px",
    }
})

const RecordsTitle = () => {
    const styles = getStyles();

    return (
        <h2 style={styles.title}>Records</h2>
    )
}

export default RecordsTitle;