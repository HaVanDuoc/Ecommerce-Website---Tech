import { Box, Container, Grid, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { requestLatestProducts } from "~/api"
import Card from "~/components/Card"
import SkeletonCard from "~/components/skeleton"
import { selectorProducts } from "~/redux/productSlice"
import Title from "./Title"

const SuggestProduct = () => {
    const dispatch = useDispatch()
    const products = useSelector(selectorProducts)?.home?.latest
    const more = new URLSearchParams(window.location.search).get("more") || 1

    useEffect(() => {
        if (products && products.payload[`${more}`]) return
        const config = { limit: 20 }
        requestLatestProducts(dispatch, config)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSeeMore = () => {
        // if (offset === 0) {
        //   setOffset(limit);
        //   setLimit(10);
        //   return;
        // }
        // setOffset(offset + 10);
        // setLimit(10);
    }

    return (
        <Box sx={{ paddingBottom: 8 }}>
            <Container maxWidth="lg" disableGutters>
                <Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <Title>Gợi ý cho hôm nay</Title>
                    </Box>

                    <Box>
                        {products && products.payload[`${more}`] ? (
                            <Grid container spacing={2}>
                                {products.payload[`${more}`].map((item, index) => {
                                    return (
                                        <Grid item xs={2.4} key={index}>
                                            <Card product={item} />
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        ) : (
                            <Grid container spacing={2}>
                                {Array.apply(null, { length: 20 }).map(() => (
                                    <Grid item xs={2.4}>
                                        <SkeletonCard />
                                    </Grid>
                                ))}
                            </Grid>
                        )}

                        <Box sx={styles1}>
                            {products?.currentPage !== products?.sumPages ? (
                                <Box onClick={handleSeeMore} sx={styles2}>
                                    <Typography sx={styles3}>
                                        {`Xem thêm ${
                                            products?.sumProducts - products?.currentPage * products?.limit
                                        } sản phẩm`}
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography fontSize="13px" fontStyle="italic">
                                    (Đã đến cuối)
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default SuggestProduct

const styles1 = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "32px",
}

const styles2 = {
    width: "350px",
    height: "50px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #aaa",
    borderRadius: "8px",
    cursor: "pointer",
    backgroundColor: "#fff",
    boxShadow: "0 0 1px 1px rgba(0, 0, 0, 0.1)",
    transition: "all .3s ease",

    ":hover": {
        borderColor: "var(--color-main)",
        boxShadow: "0 0 1px 1px rgba(0, 0, 0, 0.1)",

        "& p": {
            color: "var(--color-main)",
        },
    },
}

const styles3 = {
    color: "var(--color-text)",
    textTransform: "capitalize",
    fontWeight: 500,
}
