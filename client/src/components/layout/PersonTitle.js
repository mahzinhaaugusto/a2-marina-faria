const getStyles = () => ({
    title: {
        fontSize: 20,
        fontWeight: "bold",
        padding: "15px",
        marginBottom: "15px",
    }
})

const PersonTitle = () => {
    const styles = getStyles();

    return (
        <h2 style={styles.title}>Add Person</h2>
    )
}

export default PersonTitle;