import java.math.BigInteger;
import java.util.*;
import java.io.*;
import org.json.*;

public class Generator {

  String electionAddress;
  String HOME = System.getProperty("user.home");

  KeyPairBuilder keygen = new KeyPairBuilder();
  KeyPair keyPair = keygen.generateKeyPair();

  PublicKey pbk = keyPair.getPublicKey();

  public void generateKeys(String electionAddress) {

    JSONObject json = new JSONObject();
    JSONObject item = new JSONObject();

    json.put("election", electionAddress);

    item.put("n", pbk.getN().toString(16));
    item.put("nSquared", pbk.getnSquared().toString(16));
    item.put("g", pbk.getG().toString(16));
    item.put("bits", pbk.getBits());

    json.put("publickey", item);

    item = new JSONObject();

    item.put("lambda", keyPair.getPrivateKey().getLambda().toString(16));
    item.put("denom", keyPair.getPrivateKey().getPreCalculatedDenominator().toString(16));

    json.put("privatekey", item);

    try {
      String path = HOME + "/.electio/keys/" + electionAddress + ".json";
      File file=new File(path);
      file.createNewFile();
      FileWriter fileWriter = new FileWriter(file);

      fileWriter.write(json.toString(4));
      fileWriter.flush();
      fileWriter.close();

      System.out.println("Keys Generated in " + path);

    } catch (IOException e) {
      e.printStackTrace();
    }

  }
}
