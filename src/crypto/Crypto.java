
/*

This java file serves as command-line interface for node server
api call. For different functions of encryption and decryption,
an id and arguments are passed through the args.

e.g
> java crypto 1 <electionAddress> <publicKey> <vote>

This would indicate allow a user to encrypt their vote. As features
are included the id is incremented.

The second argument is always the election id which allows for local storage
under ~/.electio

*/

import java.math.BigInteger;
import java.util.*;
import java.io.*;
import org.json.*;

public class Crypto {

  public static void main(String [] args) {

    Generator g;
    BigInteger v;
    BigInteger n;
    BigInteger nSquared;
    BigInteger _g;
    int bits;
    String line;

    BigInteger lambda;
    BigInteger denom;

    PublicKey pbk;
    PrivateKey pvk;

    if (args.length == 0) {

      System.out.println("No args passed");
      return;

    } else {

      switch (args[0]) {

        case "1":
          g = new Generator();
          g.generateKeys(args[1]);
          break;

        case "2":
          v = new BigInteger(args[1], 2);
          n = new BigInteger(args[2], 16);
          nSquared = new BigInteger(args[3], 16);
          _g = new BigInteger(args[4], 16);
          bits = Integer.parseInt(args[5]);

          pbk = new PublicKey(n, nSquared, _g, bits);
          System.out.print(pbk.encrypt(v).toString(16));
          break;

        case "3":

          line = "";
          try{
            Scanner in = new Scanner(new FileReader(args[1]));
            StringBuilder sb = new StringBuilder();
            while(in.hasNext()) {
                sb.append(in.next());
            }
            in.close();
            line = sb.toString();
          } catch(FileNotFoundException e) {
            System.out.println("File not found");
          }

          JSONObject root = new JSONObject(line);
          JSONObject json_pbk = root.getJSONObject("pbk");
          JSONObject json_pvk = root.getJSONObject("pvk");

          v = new BigInteger((String) root.get("hash"), 16);
          n = new BigInteger((String) json_pbk.get("n"), 16);
          nSquared = new BigInteger((String) json_pbk.get("nSquared"), 16);
          _g = new BigInteger((String) json_pbk.get("g"), 16);
          bits = Integer.parseInt((String) json_pbk.get("bits"));
          
          

          lambda = new BigInteger((String) json_pvk.get("lambda"), 16);
          denom = new BigInteger((String) json_pvk.get("denom"), 16);

          pbk = new PublicKey(n, nSquared, _g, bits);
          pvk = new PrivateKey(lambda, denom);

          KeyPair kp = new KeyPair(pvk, pbk, null);

          System.out.print(kp.decrypt(v).toString());
          break;

        case "4":
          n = new BigInteger(args[1], 16);
          nSquared = new BigInteger(args[2], 16);
          _g = new BigInteger(args[3], 16);
          bits = Integer.parseInt(args[4]);

          pbk = new PublicKey(n, nSquared, _g, bits);

          line = "";
          try{
            Scanner in = new Scanner(new FileReader(args[5]));
            StringBuilder sb = new StringBuilder();
            while(in.hasNext()) {
                sb.append(in.next());
            }
            in.close();
            line = sb.toString();
          } catch(FileNotFoundException e) {
            System.out.println("File not found");
          }

          JSONArray votesArrayJSON = new JSONArray(line);

          BigInteger sum = BigInteger.ONE;
          BigInteger tmp = BigInteger.ONE;

          if (votesArrayJSON != null) {
             int len = votesArrayJSON.length();
             sum = new BigInteger(votesArrayJSON.get(0).toString(), 16);
             for (int i=1;i<len;i++){
              tmp = new BigInteger(votesArrayJSON.get(i).toString(), 16);
              sum = pbk.add(sum, tmp);
             }
          }

          System.out.print(sum.toString(16));
          break;

        default:
          System.out.println("No case for id " + args[0]);
          break;
      }
    }
  }
}
