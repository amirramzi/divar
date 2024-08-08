"use client";

import {
  CardActionArea,
  Stack,
  Typography,
  CardContent,
  Card,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import noImg from "../../../../../public/media/noImage.png";

export default function PostCard({
  title,
  deposit,
  rent,
  price,
  img,
  id,
  time,
  city,
  situation,
}) {
  const urlIsInvalid = /undefined$/.test(img);
  const imgUrl = urlIsInvalid ? noImg : img;
  const formatTime = (time) => {
    const now = new Date();
    const postTime = new Date(time);
    const diffInMinutes = Math.floor((now - postTime) / 6000);

    if (diffInMinutes <= 5) {
      return "لحظاتی پیش";
    } else if (diffInMinutes <= 30) {
      return "یک ربع پیش ";
    } else if (diffInMinutes <= 60) {
      return "نیم ساعت پیش ";
    } else if (diffInMinutes >= 120) {
      return "امروز";
    }
    // } else {
    //   return postTime.toLocaleString(); // Default to showing the full date and time
    // }
  };
  const formattedTime = formatTime(time);
  return (
    <Link href={`/post/${id}`}>
      <Card className="w-[345px] h-[168px] !bg-gray-900 !text-white border border-gray-800">
        <CardActionArea>
          <Stack direction="row">
            <CardContent className="flex flex-col ">
              <Typography gutterBottom variant="subtitle1" component="div">
                <span className="line-clamp-2 leading-tight font-bold">
                  {title}
                </span>
              </Typography>
              <Typography
                variant="body2"
                color="InactiveCaptionText"
                component="div"
              >
                <div className="mt-5">
                  {deposit && <div>ودیعه :{deposit} تومان</div>}
                  {rent && <div>اجاره :{rent} تومان</div>}
                  {price && <div>{price} تومان</div>}
                </div>

                <div>
                  {formattedTime} در {city}
                </div>
              </Typography>
            </CardContent>

            <Image
              src={imgUrl}
              alt="img"
              priority
              className="p-4 rounded-3xl w-[162px] h-[162px]"
              width={162}
              height={162}
              onError={(e) => (e.currentTarget.src = noImg)} // Fallback if image fails to load
            />
          </Stack>
          {situation && (
            <div className="w-full flex justify-center pb-2">{situation}</div>
          )}
        </CardActionArea>
      </Card>
    </Link>
  );
}
