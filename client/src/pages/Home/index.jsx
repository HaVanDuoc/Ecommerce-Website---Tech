import "./styles/fonts.css"
import "./styles/slider-banner.scss"
import { Box, Container, Grid, Stack, styled, Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import Slider from "react-slick"
import { PF } from "~/utils/__variables"
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone"
import FlashOnIcon from "@mui/icons-material/FlashOn"
import SportsEsportsIcon from "@mui/icons-material/SportsEsports"
import ExtensionIcon from "@mui/icons-material/Extension"
import { NextArrow, PrevArrow } from "~/styles/slider"
import Categories from "./components/Categories"
import LatestProduct from "./components/LatestProduct"
import SuggestProduct from "./components/SuggestProduct"

const Wrapper = styled(Box)(() => ({
    "--home-bg-second": "#f0f2f5",
    "--padding-section": "50px 0",
}))

const Home = () => {
    return (
        <Wrapper>
            <Banner />

            <LatestProduct Title={Title} />

            <Categories />

            <Box sx={{ backgroundColor: "#fff", padding: "50px 0" }}>
                <PaymentOnline />
                <Services />
            </Box>

            <SpecialBrand />

            <News />

            <SuggestProduct Title={Title} />
        </Wrapper>
    )
}

export default Home

const News = () => {
    return (
        <Box
            sx={{
                backgroundColor: "var(--home-bg-second)",
                padding: "var(--padding-section)",

                ".card-news": {
                    backgroundColor: "#fff",
                    borderRadius: "7px",
                    overflow: "hidden",
                    boxShadow: "0 0 3px 1px rgba(0, 0, 0, 0.175)",
                    cursor: "pointer",

                    ":hover": {
                        boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.25)",
                    },

                    ".card-media": {
                        width: "100%",
                        minHeight: "100px",

                        img: {
                            width: "100%",
                        },
                    },

                    ".card-content": {
                        padding: "24px 16px",

                        ".createdAt": {
                            fontSize: ".8rem",
                            color: "#666",
                        },

                        ".title": {
                            fontSize: "1rem",
                            fontWeight: 500,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            margin: "5px 0",
                        },

                        ".content": {
                            display: "-webkit-box",
                            "-webkit-line-clamp": "3",
                            "-webkit-box-orient": "vertical",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontSize: ".9rem",
                        },
                    },
                },
            }}
        >
            <Container maxWidth="lg" disableGutters>
                <Stack flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Title>Bản tin mới nhất</Title>
                    <Link>
                        <Typography
                            sx={{
                                color: "var(--color-text)",
                                textTransform: "uppercase",

                                ":hover": {
                                    color: "var(--color-main)",
                                },
                            }}
                        >
                            Xem tất cả
                        </Typography>
                    </Link>
                </Stack>

                <Box>
                    <Slider
                        dots={false}
                        infinite={false}
                        speed={500}
                        slidesToShow={4}
                        slidesToScroll={4}
                        nextArrow={<NextArrow />}
                        prevArrow={<PrevArrow />}
                        className="custom-slider"
                    >
                        {news.map((item) => (
                            <Box key={item.id}>
                                <Box className="card-news">
                                    <Box className="card-media">
                                        <img src={PF + "/assets/news/" + item.img} alt="" />
                                    </Box>
                                    <Box className="card-content">
                                        <Typography className="createdAt">{item.createdAt}</Typography>
                                        <Typography className="title">{item.title}</Typography>
                                        <Typography className="content">{item.content}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Slider>
                </Box>
            </Container>
        </Box>
    )
}

const SpecialBrand = () => {
    const brand = [
        {
            id: 1,
            img: "sony.png",
        },
        {
            id: 2,
            img: "sandisk.png",
        },
        {
            id: 3,
            img: "dell.png",
        },
        {
            id: 4,
            img: "lg.png",
        },
        {
            id: 5,
            img: "bose.png",
        },
        {
            id: 6,
            img: "samsung.png",
        },
        {
            id: 7,
            img: "canon.png",
        },
    ]

    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                paddingBottom: "80px",
            }}
        >
            <Container maxWidth="lg" disableGutters>
                <Stack
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        boxShadow: "0 0 3px 1px rgba(0, 0, 0, 0.175)",
                        padding: "30px 0",
                        borderRadius: "8px",
                    }}
                >
                    {brand.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                width: "calc(100/7)%",
                                padding: 2,
                                cursor: "pointer",
                            }}
                        >
                            <img src={PF + "/assets/brand-special/" + item.img} alt="" width="100%" />
                        </Box>
                    ))}
                </Stack>
            </Container>
        </Box>
    )
}

export const Services = () => {
    const styleService = {
        margin: "30px 0",

        ".item": {
            borderRadius: "15px",
            overflow: "hidden",
            padding: "15px",
            height: "100%",
            cursor: "pointer",

            svg: {
                fontSize: "40px",
            },

            ".icon": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "14px",
                borderRadius: "50%",
            },
        },

        ".col-1": {
            backgroundColor: "#DCEEFF",
        },
        ".col-2": {
            backgroundColor: "#FEF5CF",
        },
        ".col-3": {
            backgroundColor: "#FFEFDB",
        },
        ".col-4": {
            backgroundColor: "#E1FECF",
        },
    }

    return (
        <Box sx={styleService}>
            <Container maxWidth="lg" disableGutters>
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        padding: "24px",
                        boxShadow: "0 0 4px 1px rgba(0, 0, 0, 0.25)",
                        borderRadius: "15px",
                    }}
                >
                    <Typography
                        sx={{
                            paddingBottom: "15px",
                            fontWeight: 500,
                            textTransform: "uppercase",
                            fontSize: "20px",
                        }}
                    >
                        Dịch vụ tiện ích
                    </Typography>

                    <Box>
                        <Grid container spacing={2}>
                            {/* Thẻ cào */}

                            <Grid item xs={3}>
                                <Box className="item col-1">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Box className="icon" sx={{ backgroundColor: "#b1cde8" }}>
                                            <PhoneIphoneIcon sx={{ color: "#0555ab" }} />
                                        </Box>
                                        <Typography fontSize={24} padding="10px 0">
                                            Mua thẻ cào
                                        </Typography>
                                        <Typography fontSize={20} textAlign="center">
                                            <span style={{ color: "red" }}>Giảm 2%</span> cho mệnh giá từ 100.000 trở
                                            lên
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            {/* Điện nước */}

                            <Grid item xs={3}>
                                <Box className="item col-2">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Box className="icon" sx={{ backgroundColor: "#f0d45f" }}>
                                            <FlashOnIcon sx={{ color: "#fe780d" }} />
                                        </Box>
                                        <Typography fontSize={24} padding="10px 0">
                                            Dịch vụ đóng tiền
                                        </Typography>
                                        <Typography fontSize={20} textAlign="center">
                                            Điện, Nước, Internet, Cước điện thoại trả sau
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            {/* Card game */}

                            <Grid item xs={3}>
                                <Box className="item col-3">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Box
                                            className="icon"
                                            sx={{
                                                backgroundColor: "#ff939087",
                                            }}
                                        >
                                            <SportsEsportsIcon sx={{ color: "#fd0802" }} />
                                        </Box>
                                        <Typography fontSize={24} padding="10px 0">
                                            Mua thẻ game
                                        </Typography>
                                        <Typography fontSize={20} textAlign="center">
                                            <span style={{ color: "red" }}>Giảm 2%</span> cho tất cả các nhà mạng, áp
                                            dụng giá từ 300.000 trở lên
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>

                            {/* Vệ sinh */}

                            <Grid item xs={3}>
                                <Box className="item col-4">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                        }}
                                    >
                                        <Box
                                            className="icon"
                                            sx={{
                                                backgroundColor: "#4de1504f",
                                            }}
                                        >
                                            <ExtensionIcon sx={{ color: "#1ca91f" }} />
                                        </Box>
                                        <Typography fontSize={24} padding="10px 0">
                                            Dịch vụ vệ sinh
                                        </Typography>
                                        <Typography fontSize={20} textAlign="center">
                                            Máy lạnh, Máy giặt, Quạt, PC, Laptop
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export const PaymentOnline = () => {
    const Item = styled(Box)(() => ({
        borderRadius: "15px",
        overflow: "hidden",
    }))

    const dummyPayment = [
        { id: 1, img: "1.png" },
        { id: 2, img: "2.png" },
        { id: 3, img: "3.png" },
        { id: 4, img: "4.png" },
    ]

    return (
        <Box>
            <Container maxWidth="lg" disableGutters>
                <Title>Thanh toán online</Title>

                <Box>
                    <Slider
                        dots={false}
                        infinite={true}
                        speed={500}
                        slidesToScroll={3}
                        slidesToShow={3}
                        autoplay={true}
                        autoplaySpeed={5000}
                        cssEase={"linear"}
                        nextArrow={<NextArrow />}
                        prevArrow={<PrevArrow />}
                        className="custom-slider"
                    >
                        {dummyPayment.map((item, index) => {
                            return (
                                <Item key={index}>
                                    <img
                                        src={PF + "/assets/payment-online/" + item.img}
                                        alt=""
                                        width="100%"
                                        style={{
                                            borderRadius: "15px",
                                            overflow: "hidden",
                                        }}
                                    />
                                </Item>
                            )
                        })}
                    </Slider>
                </Box>
            </Container>
        </Box>
    )
}

const Title = ({ children }) => {
    return (
        <Box>
            <Typography
                sx={{
                    color: "#000",
                    fontSize: "24px",
                    fontWeight: 500,
                    textTransform: "capitalize",
                }}
            >
                {children}
            </Typography>
        </Box>
    )
}

export const Banner = () => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 300,
        autoplaySpeed: 5000,
        cssEase: "linear",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    }

    const dummyData = [
        { link: "", src: "720-220-720x220-17.png" },
        { link: "", src: "720x220-720x220-14.png" },
        { link: "", src: "720-220-720x220-71.png" },
        { link: "", src: "720-220-720x220-71.jpg" },
        { link: "", src: "720-220-720x220-17.png" },
    ]

    return (
        <Box
            sx={{
                position: "relative",
                backgroundColor: "#fff",
                height: "460px",

                ".slick-slider": {
                    ".next-arrow": {
                        transform: "translateX(50%)",
                    },
                    ".prev-arrow": {
                        transform: "translateX(-50%)",
                    },
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    margin: "0 auto",
                    overflow: "hidden",
                }}
            >
                <img
                    src={PF + "/assets/banner/Banner-Bighero---Desk---Nen-1920x450.jpg"}
                    alt=""
                    style={{ width: "100%" }}
                />
            </Box>

            <Box
                className="mainBanner"
                sx={{
                    position: "absolute",
                    left: "50%",
                    bottom: "0px",
                    transform: "translateX(-50%)",
                }}
            >
                <Container disableGutters>
                    <Slider {...settings} className="custom-slider slider-banner">
                        {dummyData.map((item, index) => (
                            <Box key={index}>
                                <Box>
                                    <img
                                        src={PF + "/assets/banner/" + item.src}
                                        alt=""
                                        width="100%"
                                        style={{ borderRadius: "15px" }}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </Slider>
                </Container>
            </Box>
        </Box>
    )
}

export const news = [
    {
        id: 1,
        createdAt: "1 giờ trước",
        img: "1.jpg",
        title: `Người dùng còn không mặn mà, Lenovo quyết định rời khỏi thị trường gaming phone`,
        content: `Trong những tin tức gần đây, có thông tin cho rằng điện thoại chơi game không còn được người dùng quan tâm, vì dòng Legion của Lenovo và Black Shark của Xiaomi đều đã ngừng hoạt động. Dự đoán của tổng giám đốc điều hành Redmi, Lu Weibing, vào đầu năm nay dường như đã trở thành sự thật.`,
    },
    {
        id: 2,
        createdAt: "14 giờ trước",
        img: "2.jpg",
        title: `Galaxy S23 Ultra 5G chiến thắng 'áp đảo' các đối thủ 'đáng gờm' của nhà Apple và Google`,
        content: `Trong bài kiểm tra hiệu năng được thực hiện bởi "In Depth Tech Reviews" cho thấy, Galaxy S23 Ultra 5G đã có chiến thắng "áp đảo" so với các đối thủ "đáng gờm" là iPhone 14 Pro Max và Pixel 7 Pro. Nội dung bài kiểm tra là cho các thiết bị chạy các tác vụ siêu nặng trong 30 phút nhằm đánh giá tốc độ, hiệu năng và thời lượng pin của từng mẫu máy.`,
    },
    {
        id: 3,
        createdAt: "3 ngày trước",
        img: "3.jpg",
        title: `Dell Technologies ra mắt nhiều máy tính cá nhân mới giúp người dùng làm việc mọi lúc mọi nơi`,
        content: `Cách thức, địa điểm mà chúng ta làm việc đã có sự khác biệt. Cho dù đó là làm việc kết hợp (hybrid work), làm việc từ xa (remote work), làm việc linh hoạt (flexible work) hay làm việc tại văn phòng, tất cả đều có một điểm chung là công nghệ. Công nghệ mang đến tính bình đẳng để thúc đẩy sự phát triển của hợp tác làm việc và năng suất, từ đó mang đến những trải nghiệm linh hoạt và tự do hơn.`,
    },
    {
        id: 4,
        createdAt: "24/3/2023",
        img: "4.jpg",
        title: `Quá đã, nhà Táo khuyết vẫn còn deal ngon giảm 7 triệu đến cuối tháng này`,
        content: `Bạn vẫn còn cơ hội để mua những sản phẩm chất lượng của nhà Táo khuyết với mức giảm giá hấp dẫn. Không bỏ lỡ cơ hội để tiết kiệm 7 triệu đồng khi mua sản phẩm của Apple đến cuối tháng này. Các mẫu iPhone thế hệ trước lẫn mới nhất đều đang có mức giá ưu đãi hấp dẫn. Nhanh tay đặt hàng để sở hữu những sản phẩm công nghệ tốt nhất của Apple với giá tiết kiệm nhất! `,
    },
    {
        id: 5,
        createdAt: "",
        img: "4.jpg",
        title: `Quá đã, nhà Táo khuyết vẫn còn deal ngon giảm 7 triệu đến cuối tháng này`,
        content: `Bạn vẫn còn cơ hội để mua những sản phẩm chất lượng của nhà Táo khuyết với mức giảm giá hấp dẫn. Không bỏ lỡ cơ hội để tiết kiệm 7 triệu đồng khi mua sản phẩm của Apple đến cuối tháng này. Các mẫu iPhone thế hệ trước lẫn mới nhất đều đang có mức giá ưu đãi hấp dẫn. Nhanh tay đặt hàng để sở hữu những sản phẩm công nghệ tốt nhất của Apple với giá tiết kiệm nhất! `,
    },
]
