const getStyles = () => ({
    title: {
        fontSize: 24,
        fontWeight: "bold",
        padding: "15px",
        marginBottom: "50px",
        borderBottom: "1px solid black",
    }
})

const Title = () => {
    const styles = getStyles();

    return (
        <h1 style={styles.title}>PEOPLE AND THEIR CARS</h1>
    )
}

export default Title;
