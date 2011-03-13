#!/bin/bash
# Used to resize the images 

help_messge()
{
        echo "Usage: resize_image -d <dir> -w <width> -h <height>"
        echo "-d The directory contains the images"
        echo "-w The width after convert"
        echo "-h The height after convert"
        exit 1
}

if [ $# -lt 6 ]
then
        help_messge
fi

while getopts d:w:h: opt
do
        case "$opt" in
                d) dir="$OPTARG";;
                w) w="$OPTARG";;
                h) h="$OPTARG";;
        esac
done

if [ -d $dir ]
then
        cd $dir
        ls  *.jpg > filelist.$$
        for image in $(cat filelist.$$)
        do
                echo "Convert file $image"
                convert -resize "$w"x"$h" $dir/$image $dir/_$image
        done
        rm filelist.$$
        nautilus $dir
else
        echo "The directory $dir is not exist"
        exit 1
fi