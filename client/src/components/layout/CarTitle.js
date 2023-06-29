const getStyles = () => ({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        padding: "15px",
        marginBottom: "15px",
    }
})

const CarTitle = () => {
    const styles = getStyles();

    return (
        <h2 style={styles.title}>Add Car</h2>
    )
}

export default CarTitle;