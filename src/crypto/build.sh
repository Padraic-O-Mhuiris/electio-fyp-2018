javac -cp '.:jars/json.jar' *.java   
rm paillier.jar
jar cfm paillier.jar manifest.txt *.class
rm *.class
