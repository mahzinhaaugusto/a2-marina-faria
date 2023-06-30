const getStyles = () => ({
    title: {
        fontSize: 18,
        fontWeight: "bold",
        padding: "15px",
        marginBottom: "50px",
        borderBottom: "1px solid lightGray",
        width: "100%",
        textAlign: "center",
    }
})

const PersonTitle = () => {
    const styles = getStyles();

    return (
        <h2 style={styles.title}>Add Person</h2>
    )
}

export default PersonTitle;