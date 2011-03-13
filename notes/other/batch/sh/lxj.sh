for i in *.htm;
do mv $i ${i%%\.*}.html; 
done