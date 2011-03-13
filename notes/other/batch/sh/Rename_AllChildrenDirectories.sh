#!/bin/bash
# Rename_AllChildrenDirectories.sh
# 问题描述：
# 某目录及其子目录中出现一些以“;1”结尾的文本文件名，编写shell脚本，
# 以去除这个目录及其子目录中所有该类文件名中结尾部分的“;1”。

# COUNT用于计数，错误输入的情况下，默认为允许3次尝试。
COUNT=0
while [ $COUNT -lt 3 ]
do
	echo  "请输入要重命名的文件所在父目录的路径："
	read PATH

	if [ -d $PATH ]
	then
		cd $PATH
		# NUM代表符合条件的、可重命名的文件数。
		NUM=`/usr/bin/find $PATH -type f|/bin/grep .*\;1$|/usr/bin/wc -l`
		echo "在这个目录及其子目录中需要重命名的文件有：$NUM 个"

		# 如果NUM为0，说明无需重命名操作，退出。
		if [ $NUM -eq 0 ]
		then
			echo "无需重命名，退出。"
			exit
		fi

		# 列出符合条件的、要重命名的文件,并进行重命名操作。
		for loop in `/usr/bin/find $PATH -type f|/bin/grep .*\;1$|/usr/bin/sort`
		do
			echo $loop
			# 进行重命名操作，错误信息输出到/tmp目录下以该程序名开头的“_error.log”文件中
			/bin/mv $loop `echo -n $loop | /bin/sed 's/\;1//'` 2>/tmp/`/usr/bin/basename $0`_error.log
		done

		echo "重命名完成！"
		
		TOTAL=`/usr/bin/find $PATH -type f|/usr/bin/wc -l`
		echo "在这个目录及其子目录中的普通文件有：$TOTAL 个"
		/usr/bin/find $PATH -type f|/usr/bin/sort

		exit
	else # 输入的路径并非代表目录。
		if (($COUNT<2))
		then
			echo "输入的路径错误，请确认后输入。"	
		else
			echo "尝试次数过多，退出。"
		fi
	fi
	
	# 计数器COUNT加1。
	COUNT=$[$COUNT+1]
done