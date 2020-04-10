<>
    <Grid container item xs={12}>
        <Grid item xs={12} md={4}>Full Name</Grid>
        <Grid item xs={12} md={8} className={classes.fieldGrid} >
            {editable ?
                <TextField multiline type="text" className={classes.contactField}
                    value={state.fullname} name="fullname" onChange={handleChangeInput}
                    helperText={nameError || " "} error={nameError.length > 0}
                />
                : display(contact.fullname)}
        </Grid>
    </Grid>
    <Grid container item xs={12}>
        <Grid item xs={12} md={4}>Email</Grid>
        <Grid item xs={12} md={8} className={classes.fieldGrid}>
            {editable ?
                <TextField multiline className={classes.contactField}
                    value={state.email} name="email" onChange={(e) => handleChangeInput(e, "email")}
                    helperText={emailError || " "} error={emailError.length > 0}
                />
                : display(contact.email)}
        </Grid>
    </Grid>
    <Grid container item xs={12}>
        <Grid item xs={12} md={4}>Phone</Grid>
        <Grid item xs={12} md={8} className={classes.fieldGrid} > {editable ?
            <TextField multiline type="number" className={classes.contactField}
                value={state.phone} name="phone" onChange={handleChangeInput}
                helperText={phoneError || " "} error={phoneError.length > 0}
            />
            : display(contact.phone)}</Grid>
    </Grid>
    <Grid container item xs={12}>
        <Grid item xs={12} md={4}>Company</Grid>
        <Grid item xs={12} md={8} className={classes.fieldGrid}  > {editable ?
            <TextField multiline type="text" className={classes.contactField}
                value={state.company} name="company" onChange={handleChangeInput}
                helperText={companyError || " "} error={companyError.length > 0}
            />
            : display(contact.company)}
        </Grid>
    </Grid>
</>