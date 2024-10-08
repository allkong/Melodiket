package com.ssafy.jdbc.melodiket.photocard.service.contract;

import lombok.Data;
import org.web3j.abi.datatypes.Type;

import java.util.List;
import java.util.UUID;

@Data
public class PhotoCard {
    private final long id;
    private final UUID uuid;
    private final UUID ticketUuid;
    private final String ownerAddress;
    private final String imageCid;

    public PhotoCard(List<Type> responseValues) {
        this.id = ((org.web3j.abi.datatypes.generated.Uint256) responseValues.get(0)).getValue().longValue();
        this.uuid = UUID.fromString(((org.web3j.abi.datatypes.Utf8String) responseValues.get(1)).getValue());
        this.ticketUuid = UUID.fromString(((org.web3j.abi.datatypes.Utf8String) responseValues.get(2)).getValue());
        this.ownerAddress = ((org.web3j.abi.datatypes.Address) responseValues.get(3)).getValue();
        this.imageCid = ((org.web3j.abi.datatypes.Utf8String) responseValues.get(4)).getValue();
    }
}
